var itemId = 0;

function bindRTCMgmtPageEvent() {
    $(document).on('click', '#reloadBtn', function () {
        reloadRTCMgmtPartial();
    });

    $(document).on('click', '.assignAction', function () {
        $('#assignPopUp').modal("show");
        var rowObj = $(this).closest('tr');
        itemId = rowObj.data('itemid');
        $('#assignPopUp .assignItemName').text(rowObj.data('itemname'));
        $('#assignPopUp .assignItemDescription').text(rowObj.data('itemdescription'));
        $('#assignPopUp .assign-user-name').val('testing...');
    });

    $(document).on('click', '.assign-save-btn', function () {
        saveAssignWorkItem();
    });
}

function initRTCMgmtLineChart(dailyWItemLabels, dailyCount) {

    var lineChartData = {
        labels: dailyWItemLabels,
        datasets: [
          {
              label: "Work Item Count",
              fillColor: "rgba(60,141,188,0.9)",
              strokeColor: "rgba(60,141,188,0.8)",
              pointColor: "#3b8bba",
              pointStrokeColor: "rgba(60,141,188,1)",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(60,141,188,1)",
              data: dailyCount
          }
        ]
    };

    var lineChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: true,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: false,
        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true,
        //Put dataset labels into multiTooltip Template
        multiTooltipTemplate: "<%= datasetLabel %> : <%= value %>",
        // Boolean or a positive integer denoting number of labels to be shown on x axis
        showXLabels: 10,
    };

    //-------------
    //- LINE CHART -
    //--------------
    var lineChartCanvas = $("#workItemDailyLineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas);
    lineChart.Line(lineChartData, lineChartOptions);
}

function reloadRTCMgmtPartial() {
    var startDate = $("#StartDate").val();
    var endDate = $("#EndDate").val();
    var clientUserId = $('#ClientUserId').val() === '' ? 0 : +$('#ClientUserId').val(); //to-do
    if (validateDateRange(startDate, endDate)) {
        $.ajax({
            url: "/RTCMgmt/ReloadRTCMgmtPartial",
            data: { StartDate: startDate, EndDate: endDate },
            type: "POST",
            success: function (data) {
                $('.rtcmgmt-partial').html(data);
                initCommonDataTable('#DashboardDataTbl');
                reloadRTCMgmtLineChart(startDate, endDate);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Reload RTCMgmt partial error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
            }
        });
    }
    else {
        //to-do
    }
}

function reloadRTCMgmtLineChart(startDate, endDate) {
    $.ajax({
        url: "/RTCMgmt/ReloadRTCMgmtLineChart",
        data: { StartDate: startDate, EndDate: endDate },
        type: "POST",
        success: function (data) {
            if (data.WItemDateList.length > 0) {
                $('#workItemDailyLineChart').remove();
                $('.work-item-daily').append('<canvas id="workItemDailyLineChart" style="height:300px"></canvas>');
                initRTCMgmtLineChart(data.WItemDateList, data.DailyCountList);
            }
            else {
                $('#workItemDailyLineChart').remove();
                $('.work-item-daily').append('<canvas id="workItemDailyLineChart" style="height:300px"></canvas>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Reload RTCMgmt line chart error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
        }
    });
}

function validateDateRange(startDateStr, endDateStr) {
    var valResult = true;
    var startDate = new Date(startDateStr);
    var endDate = new Date(endDateStr);
    if (startDate == null || startDate == 'Invalid Date') {
        valResult = false;
        alert("Please input the right start time.");
    }
    else if (endDate == null || endDate == 'Invalid Date') {
        valResult = false;
        alert("Please input the right end time.");
    }
    else if (endDate.getTime() < startDate.getTime()) {
        valResult = false;
        alert("Start time can't larger than end time.");
    }
    return valResult;
}

function saveAssignWorkItem() {
    var assignUserName = $('.assign-user-name').val();
    var assignWorkItemInfo = new Object();
    assignWorkItemInfo.ID = itemId;
    assignWorkItemInfo.Name = $('#assignPopUp .assignItemName').text();
    assignWorkItemInfo.Description = $('#assignPopUp .assignItemDescription').text;
    var assignWorkItemInfoJsonStr = JSON.stringify(assignWorkItemInfo);
    $.ajax({
        url: "/RTCMgmt/SaveAssignWorkItem",
        data: { WorkItemJsonStr: assignWorkItemInfoJsonStr },
        type: "POST",
        success: function (data) {
            if (data == 'success') {
                $('#assignPopUp').modal("hide");
                reloadRTCMgmtPartial();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#assignPopUp').modal("hide");
            alert("Save transfer order error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
        }
    });
}
