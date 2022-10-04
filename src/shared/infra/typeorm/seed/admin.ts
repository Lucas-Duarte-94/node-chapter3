import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
    `);
}

// async function create() {
//     const id = uuidV4();
//     const password = await hash("admin", 8);

//     console.log({ id, password });
//     // createConnection().then((connection) => {

//     //     // connection.query(`
//     //     //     INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
//     //     //     values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
//     //     // `);
//     // });
// }

create()
    .then(() => console.log("User admin created!"))
    .catch((error) => console.log(error));
