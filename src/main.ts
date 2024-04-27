import { FileView, Plugin, TFile } from "obsidian";

export default class Klog extends Plugin {
  async onload() {
    this.registerView("klog", (l) => new KlogView(l));
    this.registerExtensions(["klg"], "klog");
  }

  onunload() {}
}

class KlogView extends FileView {
  #filename = "klog";
  #content = "";

  getViewType() {
    return "klog";
  }

  getIcon() {
    return "timer";
  }

  getDisplayText() {
    return this.#filename;
  }

  async onLoadFile(file: TFile) {
    const content = await file.vault.cachedRead(file);
    this.#filename = file.name;
    this.#content = content;
    this.render();
  }

  async onOpen() {
    this.render();
  }

  async onClose() {}

  render() {
    const container = this.containerEl.children[1];
    container.empty();

    container.createEl("pre", { text: this.#content });
  }
}
