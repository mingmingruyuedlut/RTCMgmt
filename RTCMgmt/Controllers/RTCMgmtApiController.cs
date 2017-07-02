using RTCMgmt.DBManager;
using RTCMgmt.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RTCMgmt.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/RTCMgmtApi")]
    public class RTCMgmtApiController : ApiController
    {
        [HttpGet]
        [Route("RTCTest")]
        public string RTCTestString()
        {
            return "This is testing...";
        }

        [HttpGet]
        [Route("RTCWorkItem/{id}")]
        public RTCWorkItem GetRTCWorkItem(int id)
        {
            return new RTCMgmtManager().GetAllRTCWorkItems().FirstOrDefault(x => x.ID == id);
        }

        [HttpGet]
        [Route("AllRTCWorkItems")]
        public List<RTCWorkItem> GetAllRTCWorkItems()
        {
            return new RTCMgmtManager().GetAllRTCWorkItems();
        }

        [HttpPost]
        [Route("UpdateRTCWorkItem")]
        public string UpdateRTCWorkItem(RTCWorkItem wItem)
        {
            //to-do
            return "success";
        }


        [HttpPost]
        [Route("UpdateRTCWorkItemForJQuery")]
        public string UpdateRTCWorkItemForJQuery(RTCWorkItem wItem)
        {
            //to-do
            return wItem.ID.ToString() + " " + wItem.Name + " " + wItem.Description;
        }
    }
}
