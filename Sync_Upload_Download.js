
async function Upload_Attendance() {

  var Verse_Count = 0;

  var text = '';


  var startWith_date = Display_ID_2; // Exp_start_date , '20200920E'

  //var startWith_date = '20210530E'; // Exp_start_date , '20200920E'


  if(startWith_date!='') {   // exp attendance for App

     let Verse = await dbT2.Attendance.where('Record').startsWithIgnoreCase(startWith_date).toArray();

     Verse_Count = Verse.length;

     if (Verse) {

        //text += '%0D' + '%0D';   // carriage return	%0D

        text += 'AE^_^|' + Verse_Count.toString(); // Attendance , use '|' as seperator
                                                      // AE^_^ for Attendance exp and Email


        for (i = 0; i < Verse.length; i++) {

           //let CNo = Verse[i].CNo;

           let Record = Verse[i].Record;

           //text += ',' + Record;


           text += '|' + Record; // use '|' as seperator  

           //text += '%0D' + Record; // use '|' as seperator  // for test


        } // End of for (i = 0; i < Verse.length; i++)

        //var mesg1 = 'Attendance ' + Verse_Count + ' exported';

        //document.getElementById("Imp_to_Congregation4").value = text;

        //document.getElementById("Mesg4").value = mesg1;

        //document.getElementById("Send_Attendance_Message").innerHTML = mesg1;


     } // End of if (Verse)

  }
  else {

     //myExp_Db_Display.innerHTML = 'ML 0 exported';

     //document.getElementById("Mesg4").value = 'Attendance 0 exported';

     //document.getElementById("Send_Attendance2").innerHTML = "";

     //document.getElementById("Send email").innerHTML = 'Send email';

     //document.getElementById("Send_Attendance_Message").innerHTML = 'Attendance 0 exported';

  } // End of if(startWith_date!='')


  //var device_name_tmp = document.getElementById("device_name").value;   // Scott_iPad_Air3, Scott_NB

  var Name_tmp = document.getElementById("device_name_2").value;   // Scott_iPad_Air3, Scott_NB

  var Service_tmp = Display_ID_2;

  //var Service_tmp = '20210530E';

  var Upload_Meag = Name_tmp + '!' + Service_tmp + '!' + text;  // use ! as seperater


  var send_mesg_tmp = 'Upload_Attendance_' + Upload_Meag; 

  //send_mesg_tmp would be like:  Upload_Attendance_Scott_NB|20210503E|AE^_^|12|20210503E_M_B_275|20210503E_M_B_279|...

  iframe.contentWindow.postMessage(send_mesg_tmp, '*');  // send message to iframe
  return false;


  //var send_mesg_tmp = 'Insert_ROW_' + id_tmp + '_' + name_tmp; // Insert or Update

  //iframe.contentWindow.postMessage(send_mesg_tmp, '*');  // send message to iframe
  //return false;


}; // End of function Upload_Attendance()


async function Download_Attendance() {

      var device_name_tmp = document.getElementById("device_name").value;   // Scott_iPad_Air3, Scott_NB
      var service_name_tmp = document.getElementById("service_name").value; // 20210531E

      //var send_mesg_tmp = 'Download_Attendance_Scott_iPad_Air3!20210531E';   // format would be like this

      var send_mesg_tmp = 'Download_Attendance_' + device_name_tmp + '!' + service_name_tmp;   


      iframe.contentWindow.postMessage(send_mesg_tmp, '*');  // send message to iframe
      return false;

}; // End of function Download_Attendance()


window.addEventListener('message', function() {     // for receiving data from ifram

  //alert(`Received ${event.data} from ${event.origin}`);

  Receiving_Data(event);

});


var Download_n_Imp_Attendance_Records_Add_Str = '';

async function Receiving_Data(event) {

   //document.getElementById("Download_Data").innerHTML = event.data;

   //alert(`Received ${event.data} from ${event.origin}`);

   var event_tmp = event.data;  

   var event_tmp2 = event_tmp.substr(0, 37); // Download_n_Imp_Attendance_Records_Add

   var event_tmp3 = event_tmp.substr(38); // attendance records for imp

   if( event_tmp2 == 'Download_n_Imp_Attendance_Records_Add') {

      Download_n_Imp_Attendance_Records_Add_Str = event_tmp3; // attendance records for imp

      await Imp_to_Attendance_1();

   } // End of if( event_tmp2 == 'Download_n_Imp_Attendance_Records_Add') 


} // End of function Receiving_Data(event)
