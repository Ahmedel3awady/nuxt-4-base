<template>
  <UFormField
    :name="name"
    :label="label"
    :required="required"
    :description="description"
    :help="help"
    :hint="hint"
    :error="errors[0]"
    :ui="formFieldUi"
  >
    <VueEditor
      :class="[
        'quillWrapper rounded-lg border overflow-hidden transition-colors',
        errors.length
          ? 'border-error dark:border-error ring-1 ring-error/20'
          : 'border-gray-150 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500/20',
      ]"
      :modelValue="content"
      @update:modelValue="handleUpdate"
      :editorOptions="editorOptions"
      :customModules="customModules"
    />
  </UFormField>
</template>

<script setup lang="ts">
import { Quill, VueEditor } from 'vue3-editor';

// Register custom formats to accept more HTML elements
const Block = Quill.import('blots/block');
const Inline = Quill.import('blots/inline');

// Custom Div blot
class DivBlot extends Block {
  static blotName = 'div';
  static tagName = 'div';

  static create(value: any) {
    const node = super.create(value);
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(key => {
        node.setAttribute(key, value[key]);
      });
    }
    return node;
  }

  static formats(node: HTMLElement) {
    const formats: any = {};
    if (node.hasAttributes()) {
      Array.from(node.attributes).forEach(attr => {
        formats[attr.name] = attr.value;
      });
    }
    return Object.keys(formats).length > 0 ? formats : true;
  }
}

// Custom Span blot
class SpanBlot extends Inline {
  static blotName = 'span';
  static tagName = 'span';

  static create(value: any) {
    const node = super.create(value);
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(key => {
        node.setAttribute(key, value[key]);
      });
    }
    return node;
  }

  static formats(node: HTMLElement) {
    const formats: any = {};
    if (node.hasAttributes()) {
      Array.from(node.attributes).forEach(attr => {
        formats[attr.name] = attr.value;
      });
    }
    return Object.keys(formats).length > 0 ? formats : true;
  }
}

// Register custom blots
Quill.register(DivBlot, true);
Quill.register(SpanBlot, true);

defineOptions({
  inheritAttrs: false,
});

interface Props {
  name: string;
  label?: string;
  description?: string;
  help?: string;
  hint?: string;
  required?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  description: '',
  help: '',
  hint: '',
  required: false,
  placeholder: 'اكتب هنا...',
});

// Custom validation logic
const { value, errors } = useCustomField<string>(props.name);

// Local content state
const content = ref(value.value || '');

// Custom modules configuration
const customModules = [
  {
    name: 'clipboard',
    module: Quill.import('modules/clipboard'),
    options: {
      matchVisual: false,
      // Allow any HTML tags and attributes
      matchers: [
        [
          Node.ELEMENT_NODE,
          (node: HTMLElement, delta: any) => {
            // Preserve all HTML elements and their attributes
            return delta;
          },
        ],
      ],
    },
  },
];

// Editor options with expanded toolbar and formats
const editorOptions = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: ['', 'center', 'right', 'justify'] }],
      [{ direction: 'rtl' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  },
  // Expanded formats to accept more HTML elements
  formats: [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'align',
    'direction',
    'list',
    'bullet',
    'indent',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
    'div',
    'span', // Our custom formats
    'script', // If you need script tags (be careful with XSS)
  ],
  placeholder: props.placeholder,
};

// Update form value when content changes
const handleUpdate = (newContent: string) => {
  content.value = newContent;
  value.value = newContent;
};

// Watch for external value changes
watch(
  () => value.value,
  newValue => {
    if (content.value !== newValue) {
      content.value = newValue || '';
    }
  }
);

// Custom form field styling
const formFieldUi = computed(() => ({
  label: 'text-secondary font-medium',
  error: 'text-error text-sm',
  help: 'text-gray-500 text-sm',
}));
</script>

<style>
.ql-toolbar,
.ql-container.ql-snow {
  border: none !important;
}

.ql-picker-label {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.ql-toolbar.ql-snow {
  background-color: var(--color-gray-50);
}

.quillWrapper {
  overflow: hidden;
  border-radius: 8px;

  &.error {
    border-color: var(--color-error) !important;
  }
}

/* Set RTL as default direction */
.ql-editor {
  direction: rtl;
  text-align: right;
  max-height: 300px;
  overflow-y: auto;
}

/* Preserve custom HTML elements */
.ql-editor div,
.ql-editor span {
  display: inline-block;
}

/* Ensure alignment classes are styled correctly */
.ql-align-right {
  text-align: right;
}
.ql-align-center {
  text-align: center;
}
.ql-align-justify {
  text-align: justify;
}

/* Direction classes */
.ql-direction-rtl {
  direction: rtl;
  text-align: right;
}
</style>
