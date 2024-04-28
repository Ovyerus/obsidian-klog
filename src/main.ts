import { TextFileView, Plugin } from "obsidian";
import Editor from "./Editor.svelte";

export default class Klog extends Plugin {
  async onload() {
    this.registerView("klog", (l) => new KlogView(l));
    this.registerExtensions(["klg"], "klog");
  }

  onunload() {}
}

class KlogView extends TextFileView {
  #editor: Editor | undefined;

  getViewType() {
    return "klog";
  }

  getIcon() {
    return "timer";
  }

  getDisplayText() {
    return this.file?.name || "Klog (no file)";
  }

  canAcceptExtension(extension: string) {
    return extension === "klg";
  }

  async onOpen() {
    this.render();
  }

  render() {
    if (this.#editor) {
      this.#editor.$destroy();
      this.contentEl.empty();
    }

    const container = this.contentEl.createEl("div");
    const el = new Editor({
      target: container,
      props: {
        data: this.data,
        onChange: (data: string) => (this.data = data),
      },
    });
    this.#editor = el;
  }

  getViewData() {
    return this.data;
  }

  // TODO: how does obsidian do file saving in views
  setViewData(data: string): void {
    this.data = data;
    this.#editor?.$set({ data });
  }

  clear() {
    this.data = "";
  }
}
