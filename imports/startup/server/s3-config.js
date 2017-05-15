import { Slingshot } from 'meteor/edgee:slingshot';
import { Meteor } from 'meteor/meteor';

Slingshot.fileRestrictions("UsersAvatar", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});



Slingshot.createDirective("UsersAvatar", Slingshot.S3Storage, {
  bucket: "veg-corp", // change this to your s3's bucket name

  acl: "public-read",

  authorize: function (file, metaContext) { 
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file, metaContext) {
    // User's image url with ._id attached:
    let cleanedString = file.name.replace(/\s/g, "-"); // 
    return metaContext.avatarId + "/" + Date.now() + "/" + cleanedString;
    //https://veg-corp.s3.amazonaws.com/userProfileId/1472487191070/apple-touch-icon-precomposed.png
  }
});