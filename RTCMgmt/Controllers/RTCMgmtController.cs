using Newtonsoft.Json;
using RTCMgmt.DBManager;
using RTCMgmt.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RTCMgmt.Controllers
{
    public class RTCMgmtController : Controller
    {
        // GET: RTCMgmt
        public ActionResult Index()
        {
            RTCWorkItemSummary summary = new RTCMgmtManager().GetRTCWorkItemSummary();
            return View(summary);
        }

        public ActionResult RTCMgmt()
        {
            DateTime defaultStartDate = DateTime.Now.AddDays(-30);
            DateTime defaultEndDate = DateTime.Now;
            int userId = 1; // to-do, maybe get it from login session.
            RTCMgmtWorkItemSummary summary = new RTCMgmtManager().GetRTCMgmtWorkItemSummary(defaultStartDate, defaultEndDate, userId);
            return View(summary);
        }

        public PartialViewResult ReloadRTCMgmtPartial(string startDate, string endDate)
        {
            DateTime currentStartDate = DateTime.ParseExact(startDate.TrimEnd('/'), DateStringFormats.MMddyyyySlash, CultureInfo.InvariantCulture);
            DateTime currentEndDate = DateTime.ParseExact(endDate.TrimEnd('/'), DateStringFormats.MMddyyyySlash, CultureInfo.InvariantCulture);
            int userId = 1; // to-do, maybe get it from login session.
            RTCMgmtWorkItemSummary summary = new RTCMgmtManager().GetRTCMgmtWorkItemSummary(currentStartDate, currentEndDate, userId);
            return PartialView("_RTCMgmtPartial", summary);
        }

        public JsonResult ReloadRTCMgmtLineChart(string startDate, string endDate)
        {
            DateTime currentStartDate = DateTime.ParseExact(startDate.TrimEnd('/'), DateStringFormats.MMddyyyySlash, CultureInfo.InvariantCulture);
            DateTime currentEndDate = DateTime.ParseExact(endDate.TrimEnd('/'), DateStringFormats.MMddyyyySlash, CultureInfo.InvariantCulture);
            int userId = 1; // to-do, maybe get it from login session.
            RTCMgmtViewChart chartSummary = new RTCMgmtManager().GetRTCMgmtViewChartSummary(currentStartDate, currentEndDate, userId);
            return Json(chartSummary, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveAssignWorkItem(string workItemJsonStr)
        {
            RTCWorkItem workItemInfo = JsonConvert.DeserializeObject<RTCWorkItem>(workItemJsonStr);
            new RTCMgmtManager().SaveAssignWorkItemInfo(workItemInfo);
            return Json("success", JsonRequestBehavior.AllowGet);
        }

        public ActionResult RTCMgmtApi()
        {
            return View();
        }
    }
}