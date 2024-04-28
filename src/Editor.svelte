<script lang="ts">
  export let data: string;
  export let onChange: (newData: string) => void;

  $: onChange(data);
</script>

<div>
  <pre
    class="klog-content"
    contenteditable="true"
    bind:textContent={data}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
      }
    }}>
    {data}
  </pre>
</div>

<style>
  .klog-content {
    white-space: pre-wrap;
  }
</style>
