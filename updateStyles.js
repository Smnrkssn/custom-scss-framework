const fs = require("fs");
const path = require("path");

const getFolderImports = (files, folderName) => {
    let folderImports = `//import ${folderName}\n`;

    files.forEach(file => {
        folderImports += `@import "${folderName}/${file}";\n`;
    });

    folderImports += "\n";

    return folderImports;
};

const attributeFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/attributes/"));
const moduleFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/modules/"));
const resourceFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/resources"));
const externalFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/external-modules"));
const siteModuleFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/site-modules"));
const globalFiles = fs.readdirSync(path.join(__dirname, "./dev/sass/global"));

let stylesString = getFolderImports(externalFiles, "external-modules");
stylesString += getFolderImports(resourceFiles, "resources");
stylesString += getFolderImports(attributeFiles, "attributes");
stylesString += getFolderImports(moduleFiles, "modules");
stylesString += getFolderImports(globalFiles, "global");
stylesString += getFolderImports(siteModuleFiles, "site-modules");

fs.writeFile(`${__dirname}/dev/sass/style.scss`, stylesString, err => {
    if(err) throw err;

    console.log("Style.scss was updated successfully!");
});