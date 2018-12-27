$(document).ready(function() {
	console.log("loading client-side js");
});

function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    document.getElementById(cityName).style.display = "block";  
}


// var cl = new cloudinary.Cloudinary({cloud_name: "dfvzao4hk", secure: false});
// console.log(cl);
// $(document).ready(function() {
//     console.log ($.fn.cloudinary_fileupload);
//     //if($.fn.cloudinary_fileupload !== undefined) {
//       $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
//    // }
//     $('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {  
//         console.log(e,data)
//       $('.preview').html(
//          $.cloudinary.imageTag(data.result.public_id, 
//              { format: data.result.format, version: data.result.version, 
//                crop: 'scale', width: 200 }));    
//       $('.image_public_id').val(data.result.public_id);    
//       return true;});
//       $("#in").click (function(){
//         console.log("click");
//         $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
//        });
//   });
 
  
  
