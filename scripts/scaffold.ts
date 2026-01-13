import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";
import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts";

const TEMPLATE_DIR = "./scripts/templates";
const TARGET_DIR = "./src";

// Helper function to convert a string to PascalCase
function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function to convert a string to camelCase
function toCamelCase(str:string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

async function scaffold() {
  const args = Deno.args;
  if (args.length < 1) {
    console.error("Usage: deno run -A scripts/scaffold.ts <ModuleName>");
    console.error("Example: deno run -A scripts/scaffold.ts product");
    Deno.exit(1);
  }

  const moduleNameLower = args[0].toLowerCase();

  const moduleNamePascal = toPascalCase(moduleNameLower);
  const moduleNameCamel = toCamelCase(moduleNamePascal);
  const moduleNamePlural = moduleNameLower + 's';

  const replacements = {
    __NAME__: moduleNamePascal,
    __NAME_CAMEL__: moduleNameCamel,
    __NAME_LOWER__: moduleNameLower,
    __NAME_PLURAL__: moduleNamePlural,
  };

  const moduleDir = resolve(TARGET_DIR, moduleNameLower);

  try {
    await ensureDir(moduleDir);
    console.log(`Created directory: ${moduleDir}`);

    for await (const dirEntry of Deno.readDir(TEMPLATE_DIR)) {
      if (dirEntry.isFile && dirEntry.name.endsWith(".tpl")) {
        const templatePath = resolve(TEMPLATE_DIR, dirEntry.name);
        let content = await Deno.readTextFile(templatePath);

        // Replace all placeholders
        for (const [placeholder, value] of Object.entries(replacements)) {
          content = content.replace(new RegExp(placeholder, "g"), value);
        }

        const newFileName = dirEntry.name.replace(".tpl", "");
        const finalFileName = `${moduleNameLower}.${newFileName}`;
        
        const finalFilePath = resolve(moduleDir, finalFileName);

        await Deno.writeTextFile(finalFilePath, content);
        console.log(`Created file: ${finalFilePath}`);
      }
    }
    console.log(`\nModule "${moduleNamePascal}" created successfully in 'src/'!`);
    console.log("Don't forget to import the new typedefs and resolvers in your main.ts file.");

  } catch (error) {
    console.error("An error occurred:", error);
    Deno.exit(1);
  }
}

scaffold();