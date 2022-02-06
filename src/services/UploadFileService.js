import { HTTP } from "../http-common.js";
class UploadFileService {
    upload(file, onUploadProgress) {
        let formData = new window.FormData();
        formData.append("file", file);
        return HTTP.post("../assets/images"), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        };
    }
    getFiles() {
        return HTTP.get("../assets/images");
    }
}
export default new UploadFileService();