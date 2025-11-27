declare module 'vue3-editor' {
  import { DefineComponent } from 'vue';

  export const VueEditor: DefineComponent<{
    modelValue?: string;
    editorToolbar?: any[][];
    disabled?: boolean;
    editorOptions?: any;
    placeholder?: string;
    customModules?: any[];
  }>;

  export const Quill: any;
}

