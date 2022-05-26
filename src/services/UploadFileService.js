import { HTTP } from "../http-common.js";
class UploadFileService {
    upload(file, onUploadProgress, imagePath, folder) {
        alert(imagePath);
        let formData = new FormData();
        console.log(file);
        formData.append("file", file);
        console.log(formData);
        return HTTP.post(imagePath, {
            url: imagePath + folder,
            DisplayName: folder,
            file: file
        });

        // formData,
        // {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     onUploadProgress
        // }
    }
    getFiles(imagePath) {
        return HTTP.get(imagePath);
    }
    getImages(imagePath, id) {
        return HTTP.get(imagePath + id);
    }
    createFolder(folderName) {
        let formData = new FormData();
        formData.append("folderName", folderName);

        HTTP.post("/api/Folder", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(function() {
                console.log("SUCCESS!!");
            })
            .catch(function() {
                console.log("FAILURE!!");
            });
    }
}
export default new UploadFileService();
