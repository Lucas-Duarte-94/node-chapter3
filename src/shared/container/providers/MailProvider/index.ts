import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";


const mailProvider = {
    ses: container.resolve(SESMailProvider),
    ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
