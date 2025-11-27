// Button variant styles
const primaryButtonStyle = 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg';

export default defineAppConfig({
  ui: {

    button: {
      base: 'rounded-lg font-medium h-[50px] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500',

      variants: {
        variant: {
          primary: primaryButtonStyle,
          add: `${primaryButtonStyle} min-w-auto lg:min-w-46 `,
          default: 'bg-white text-gray-200 font-medium hover:bg-white/90 '
        },

      },
      defaultVariants: {
        variant: 'primary'
      }
    },

    textarea: {
      slots: {
        root: 'w-full',
        base: ' rounded-lg transition-all duration-200  ',
      },
    },
    input: {
      slots: {
        root: 'w-full',
        base: ' rounded-lg h-[50px] transition-all duration-200 ',
      },
    },
    inputTags: {
      slots: {
        root: 'w-full',
        base: 'rounded-lg min-h-[50px] transition-all duration-200',
        item: 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-xs',
        itemText: 'font-medium',
        itemDelete: 'hover:bg-primary/10 rounded-full transition-all duration-200',
        itemDeleteIcon: 'text-primary hover:text-primary/80 hover:rotate-90 transition-all duration-200',
      },
    },
    selectMenu: {
      slots: {
        base: ' rounded-lg min-w-[150px] h-[50px] w-full transition-all duration-200  ',
        content: 'min-w-fit',
        item: 'cursor-pointer',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
        placeholder: 'font-normal'

      },
    },
    toast: {
      slots: {
        root: 'rounded-lg shadow-lg',
        icon: 'shrink-0 size-5',
      },
      // variants: {
      //   color: {
      //     error: {
      //       title: 'text-error',
      //       description: 'text-error',
      //       icon: 'text-error'
      //     },
      //     success: {
      //       title: 'text-success',
      //       description: 'text-success',
      //       icon: 'text-success'
      //     },
      //   },
      // },
    },
    card: {
      variants: {
        variant: {
          solid: {
            root: 'bg-white text-secondary',
          },
        },
      },
      slots: {
        root: ' rounded-lg',
      },
    },
    pagination: {
      slots: {
        item: 'size-10',
        active: 'bg-primary text-white',
        next: 'size-10',
        prev: 'size-10',
        first: 'size-10',
        last: 'size-10',
        ellipsis: 'size-10',
        icon: 'size-10',
      }
    },
    modal: {
      slots: {
        close: 'hidden',
      }
    }

  },
});