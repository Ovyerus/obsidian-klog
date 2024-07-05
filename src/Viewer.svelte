<script lang="ts">
  import { parse, Record as KlogRecord } from "klog.js";

  import Record from "./components/Record.svelte";

  export let data: string;

  let records: KlogRecord[] = [];
  let parseError: Error | null = null;

  $: try {
    records = parse(data || "");
    parseError = null;
  } catch (err) {
    console.error("failed to parse Klog\n", err);
    parseError = err as Error;
  }
</script>

{#if parseError}
  <div class="klog-error">
    <h1 class="klog-error-title">Failed to parse Klog file</h1>
    <pre class="klog-error-message">{parseError.message}</pre>
    <p>
      If the <a
        href="https://klog.jotaen.net/#get-klog"
        rel="noopener"
        target="_blank"
        class="external-link"
      >
        Klog command line tool
      </a>
      is able to parse this file correctly, please
      <a
        href="https://github.com/Ovyerus/obsidian-klog/issues/new"
        rel="noopener"
        target="_blank"
        class="external-link"
      >
        file a bug report
      </a>
      with the above error message, as well as the Klog file that is causing it so
      that we can try to fix it.
    </p>
  </div>
{:else}
  <div class="klog-file">
    {#each records as record}
      <Record {record} />
    {/each}
  </div>
{/if}

<style>
  .klog-error {
    background: rgba(var(--background-modifier-error-rgb), 0.1);
    mix-blend-mode: var(--callout-blend-mode);
    padding: var(--callout-padding);
    border-style: solid;
    border-color: rgba(var(--callout-color), var(--callout-border-opacity));
    border-width: var(--callout-border-width);
    border-radius: var(--callout-radius);
  }

  .klog-error-title,
  .klog-error-message {
    color: var(--text-error);
  }

  .klog-file {
    user-select: text;
    display: flex;
    flex-direction: column;
  }
</style>
