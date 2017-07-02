using RTCMgmt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RTCMgmt.DBManager
{
    public class RTCMgmtManager
    {
        public RTCWorkItemSummary GetRTCWorkItemSummary()
        {
            return new RTCWorkItemSummary()
            {
                WItems = GetAllRTCWorkItems()
            };
        }

        public List<RTCWorkItem> GetAllRTCWorkItems()
        {
            List<RTCWorkItem> itemList = new List<RTCWorkItem>();
            for (int i = 0; i < 20; i++)
            {
                itemList.Add(new RTCWorkItem()
                {
                    ID = i,
                    Name = "Name" + i.ToString(),
                    Description = "This is the description " + i.ToString(),
                    CreatedTime = DateTime.Now.AddDays(-i),
                    UpdatedTime = DateTime.Now.AddMinutes(-i),
                    Comments = new List<string>() { "First Comment " + i.ToString(), "Second Comment " + i.ToString() },
                    Status = (RTCWorkItemStatus)(i % 2)
                });
            }
            return itemList;
        }



        public RTCMgmtWorkItemSummary GetRTCMgmtWorkItemSummary(DateTime staDate, DateTime endDate, int userId)
        {
            return new RTCMgmtWorkItemSummary()
            {
                WItemsSummary = GetAllRTCWorkItems(), //to-do, maybe it also need these three parameters.
                RTCMgmtViewChartSummary = GetRTCMgmtViewChartSummary(staDate, endDate, userId),
                Users = GetUsersDropDownList()
            };
        }

        public RTCMgmtViewChart GetRTCMgmtViewChartSummary(DateTime staDate, DateTime endDate, int userId)
        {
            List<string> dateList = new List<string>();
            List<int> countList = new List<int>();
            Random rd = new Random();
            for (int i = 10; i > 0; i--)
            {
                dateList.Add(DateTime.Now.AddDays(-i).ToString("MM/dd/yyyy"));
                countList.Add(rd.Next(1, 20));
            }
            return new RTCMgmtViewChart()
            {
                WItemDateList = dateList,
                DailyCountList = countList
            };
        }

        public List<SelectListItem> GetUsersDropDownList()
        {
            List<SelectListItem> userList = new List<SelectListItem>();
            for (int i = 0; i < 5; i++)
            {
                userList.Add(new SelectListItem()
                {
                    Value = i.ToString(),
                    Text = i.ToString()
                });
            }
            return userList;
        }

        public void SaveAssignWorkItemInfo(RTCWorkItem wItem)
        {
            //to-do
        }
    }

}