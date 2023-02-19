/* eslint-disable camelcase */
import { parseGoogleCloudServiceAccountKey } from '@/utils/parse-gcp-service-account';
import { File, Storage } from '@google-cloud/storage';

type GetUploadUrlDTO = {
  filename: string;
  origin: string;
};

export class FileStorageService {
  storage: Storage;

  bucketName: string;

  constructor(bucketName: string) {
    const project = parseGoogleCloudServiceAccountKey(process.env.GCLOUD_SERVICE_ACCOUNT_KEY!);
    this.storage = new Storage({
      projectId: project.project_id,
      credentials: { client_email: project.client_email, private_key: project.private_key },
    });
    this.bucketName = bucketName;
  }

  private async getFile(filename: string): Promise<File> {
    const bucket = await this.storage.bucket(this.bucketName);
    return bucket.file(filename);
  }

  async doesFileExist(filename: string): Promise<boolean> {
    const file = await this.getFile(filename);
    const [exists] = await file.exists();
    return exists;
  }

  async deleteFile(filename: string): Promise<void> {
    const file = await this.getFile(filename);
    await file.delete({ ignoreNotFound: true });
  }

  async deleteFilesFromFolder(folderName: string): Promise<void> {
    if (!folderName) {
      return;
    }
    const bucket = this.storage.bucket(this.bucketName);
    return await bucket.deleteFiles({ prefix: `${folderName}/` });
  }

  async writeFile(filename: string): Promise<NodeJS.WritableStream> {
    const file = await this.getFile(filename);
    return file.createWriteStream({ resumable: false });
  }

  async readFile(filename: string): Promise<NodeJS.ReadableStream> {
    const file = await this.getFile(filename);
    return file.createReadStream({ decompress: false });
  }

  async getUploadUrlToCreateFile({ filename, origin }: GetUploadUrlDTO): Promise<string> {
    const file = await this.getFile(filename);
    const options = origin ? { origin } : {};
    const [uploadUrl] = await file.createResumableUpload(options);
    return uploadUrl;
  }

  async getPublicUrl(filename: string): Promise<string> {
    const file = await this.getFile(filename);
    return file.publicUrl();
  }
}

export const fileStorageService = new FileStorageService('ldeventos-public');
