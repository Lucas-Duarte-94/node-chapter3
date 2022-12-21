import { container } from "tsyringe";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3Storage } from "./implementations/S3Storage";
import { IStorageProvider } from "./IStorageProvider";

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3Storage,
};

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
);
