import { Slingshot } from 'meteor/edgee:slingshot';
import { Meteor } from 'meteor/meteor';
import message from 'antd/lib/message';


export const handleFileUpload = (fileToUpload, uploadType, callback) => {

		const userId = Meteor.userId();
		const metaContext = {avatarId: userId};
    	const uploader = new Slingshot.Upload(uploadType, metaContext);

    	uploader.send(fileToUpload, function (error, downloadUrl) {
	      if (error) {
	      	message.error('Error uploading');
	        console.error('Error uploading', uploader.xhr.response); 
	        callback({ reason: error.reason });
	        return;
	      }
	      	callback(null, downloadUrl);
	        return;
	    });
};