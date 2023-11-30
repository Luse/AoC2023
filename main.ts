const folderName = Deno.args[0];

async function createFolderAndRunDenoInit() {
    try {
        const folderExists = await Deno.stat(folderName).then(() => true).catch(() => false);

        if (!folderExists) {
            await Deno.mkdir(folderName);
            const command = new Deno.Command(Deno.execPath(), {
                args: ["init", folderName],
            })

            await command.spawn();
        }

    } catch (error) {
        console.error(error);
    }
}

createFolderAndRunDenoInit();
