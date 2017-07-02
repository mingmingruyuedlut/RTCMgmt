using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RTCMgmt.Models
{
    public class RTCWorkItemSummary
    {
        public List<RTCWorkItem> WItems { get; set; }
    }

    public class RTCWorkItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime UpdatedTime { get; set; }
        public List<string> Comments { get; set; }
        public RTCWorkItemStatus Status { get; set; }
    }

    public enum RTCWorkItemStatus
    {
        Pending,
        Assigned
    }

    public class DateStringFormats
    {
        public const string MMddyyyySlash = "MM/dd/yyyy";
        public const string yyyyMMddSlash = "yyyy/MM/dd";
        public const string yyyyMMdd = "yyyyMMdd";
    }


    public class RTCMgmtWorkItemSummary
    {
        public RTCMgmtViewChart RTCMgmtViewChartSummary { get; set; }
        public List<RTCWorkItem> WItemsSummary { get; set; }
        public List<SelectListItem> Users { get; set; }
    }

    public class RTCMgmtViewChart
    {
        public List<string> WItemDateList { get; set; }
        public List<int> DailyCountList { get; set; }
    }
}