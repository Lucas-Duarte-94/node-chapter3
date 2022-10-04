import { Connection, createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string;
}

// usava a conexão abaixo antes das aulas com supertest!!!!!!!!!

// export default async () => {
//     return getConnectionOptions().then((options) => {
//         const newOptions = options as IOptions;
//         newOptions.host = "database_ignite"; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//         return createConnection({
//             ...options,
//         });
//     });
// };

export default async function (host = "database_ignite") {
    const defaultOptions = await getConnectionOptions();
    return await createConnection(
        Object.assign(defaultOptions, {
            host,
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx_test"
                    : defaultOptions.database,
        })
    );
}
