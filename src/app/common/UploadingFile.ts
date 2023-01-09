
//A model that represents an uploading file along with status
export class UploadingFile{

    public static UPLOADED:number = 1;

    public static UPLOADING:number = 0;

    public static FAILED: number = -1;

    public file: File;

    public progress: number;

    public uploadingStatus: number;

    public uniqueID : string;

    constructor(file: File, uploadingStatus: number){

        this.file = file;

        this.uploadingStatus = uploadingStatus;

    }



}