import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);
container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);
