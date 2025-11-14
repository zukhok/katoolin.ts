import fs from "fs/promises";
import readline from "node:readline/promises";
import {$} from "zx";
import toolist from "./toolist.js";
let rl = readline.createInterface(process.stdin, process.stdout);

async function addRepository() {
  try {
    let files = await fs.readdir("/etc/apt"), deb = "deb https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main non-free contrib", deb_src = "deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main non-free contrib", content = `\n\n${deb}\n${deb_src}`;
    if(files.includes("sources.list")) {
      content = (await fs.readFile("/etc/apt/sources.list", {encoding: "utf8"})).trim();
      if(content.indexOf(deb) < 0 || content.indexOf(deb_src) < 0) content += `\n\n${deb}\n${deb_src}`;
      content = content.trim();
    }
    await fs.writeFile("/etc/apt/sources.list", content);

    await fs.rm("./archive-key.asc", {force: true});
    await $`sudo wget https://archive.kali.org/archive-key.asc`;
    await $`sudo apt-key add archive-key.asc`;
    await $`sudo apt update`;
  }
  catch(e) {
    while(true) {
      let input = await rl.question("press enter 2 continue");
      if(input == "") return;
    }
  }
}

async function installPackage(packageName: string) {
  console.log(`sudo apt install -y ${packageName}`);
  await $`sudo apt install -y ${packageName}`;
}

async function uninstallPackage(packageName: string) {
  console.log(`sudo apt purge --autoremove -y ${packageName}`);
  await $`sudo apt purge --autoremove -y ${packageName}`;
}

async function install() {
  while(true) {
    console.log("\x1bc");
    console.log("install");
    let opts = Object.keys(toolist);
    opts.unshift("exit");
    for(let i = 0; i < opts.length; ++i) console.log(`${i}) ${opts[i]}`);
    let opt = await rl.question("option: ");
    let failed = [];
    if(opt == "0") return;
    else if(opts[parseInt(opt)]) {
      // @ts-ignore
      for(let packageName of toolist[opts[parseInt(opt)]]) {
        try {
          await installPackage(packageName);
        }
        catch(e) {
          failed.push(packageName);
        }
      }
      let fixOpt = await rl.question("fix dependencies ? [Y/n] ");
      if(fixOpt == "y" || fixOpt == "Y" || fixOpt == "") {
        if(failed.length) console.log(`failed: ${failed.join(" ")}`);
        console.log("sudo apt install -fy");
        await $`sudo apt install -fy`;
      }
    }
    else continue;
  }
}

async function uninstall() {
  while(true) {
    console.log("\x1bc");
    console.log("uninstall");
    let opts = Object.keys(toolist);
    opts.unshift("exit");
    for(let i = 0; i < opts.length; ++i) console.log(`${i}) ${opts[i]}`);
    let opt = await rl.question("option: ");
    let failed = [];
    if(opt == "0") return;
    else if(opts[parseInt(opt)]) {
      // @ts-ignore
      for(let packageName of toolist[opts[parseInt(opt)]]) {
        try {
          await uninstallPackage(packageName);
        }
        catch(e) {
          failed.push(packageName);
        }
      }
      let fixOpt = await rl.question("fix dependencies ? [Y/n] ");
      if(fixOpt == "y" || fixOpt == "Y" || fixOpt == "") {
        if(failed.length) console.log(`failed: ${failed.join(" ")}`);
        console.log("sudo apt install -fy");
        await $`sudo apt install -fy`;
      }
    }
    else continue;
  }
}

while(true) {
  console.log("\x1bc");
  if(process.platform != "linux") {
    while(true) {
      let opt = await rl.question("only 4 Debian based Linux distros, input 0 2 exit: ");
      if(opt == "0") {
        console.log("\x1bc");
        process.exit(0);
      }
      console.log("\x1bc");
    }
  }

  let info =
    [
      "home",
      "0) exit",
      "1) add kali repository (u can manually delete repository by removing sources from /etc/apt/sources.list, then use \"apt-key del\")",
      "2) install",
      "3) uninstall",
    ].join("\n") + "\noption: ";
  let opt = await rl.question(info);
  if(opt == "0") {
    console.log("\x1bc");
    process.exit(0);
  }
  else if(opt == "1") await addRepository();
  else if(opt == "2") await install();
  else if(opt == "3") await uninstall();
  else continue;
}