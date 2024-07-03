import {
  TextFileView,
  Plugin,
  type MarkdownViewModeType as ViewMode,
  setIcon,
  setTooltip,
} from "obsidian";
import Editor from "./Editor.svelte";

const viewModeIconData: Record<ViewMode, { title: string; icon: string }> = {
  source: {
    title: "Current view: editing\nClick to read",
    icon: "lucide-book-open",
  },
  preview: {
    title: "Current view: reading\nClick to edit",
    icon: "lucide-pencil-line",
  },
};

export default class Klog extends Plugin {
  async onload() {
    this.registerView("klog", (l) => new KlogView(l));
    this.registerExtensions(["klg"], "klog");
  }

  onunload() {}
}

class KlogView extends TextFileView {
  #editor: Editor | undefined;
  #viewMode = this.app.vault.getConfig("defaultViewMode") as ViewMode;
  actionButtons: Record<string, HTMLElement> = {};

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

  setViewMode(viewMode: ViewMode) {
    this.#viewMode = viewMode;
    this.#editor?.$set({ viewMode });
  }

  async onOpen() {
    this.render();
  }

  onunload() {
    super.onunload();
    this.actionButtons = {};
  }

  render() {
    if (this.#editor) {
      this.#editor.$destroy();
      this.contentEl.empty();
    }

    const container = this.contentEl.createEl("div");
    this.initHeaderButtons();
    const el = new Editor({
      target: container,
      props: {
        data: this.data,
        viewMode: this.#viewMode,
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

  initHeaderButtons() {
    if (!this.actionButtons["switch-view-mode"])
      this.actionButtons["switch-view-mode"] = this.addAction(
        viewModeIconData[this.#viewMode].icon,
        viewModeIconData[this.#viewMode].title,
        () => {
          const el = this.actionButtons["switch-view-mode"];
          const newMode: ViewMode =
            this.#viewMode === "preview" ? "source" : "preview";

          this.setViewMode(newMode);
          setIcon(el, viewModeIconData[newMode].icon);
          setTooltip(el, viewModeIconData[newMode].title);
        },
      );
  }

  // TODO: take kanban's approach
  // https://github.com/mgmeyers/obsidian-kanban/blob/8501981a1afacb4c8fc03ec60604aa5eedfbd857/src/KanbanView.tsx#L481
  clear() {
    this.data = "";
  }
}
