import type { NavigationMenuItem } from '@nuxt/ui';

export const useSidebar = () => {
  const toggleCollapsed = ref(false);
  const { locale } = useI18n();
  const side = computed(() => locale.value === 'ar' ? 'right' : 'left');
  const route = useRoute();
  const { state } = useAuthStore();
  // const { hasPermission } = usePermissions();

  // Normalize path: remove trailing slashes except for root
  const normalizePath = (path: string) => path === '/' ? path : path.replace(/\/$/, '');

  // Check if a menu path matches the current route
  const isPathActive = (menuPath: string): boolean => {
    const current = normalizePath(route.path);
    const menu = normalizePath(menuPath);

    if (menu === '/') return current === '/';
    return current === menu || current.startsWith(menu + '/');
  };

  // Conditional reservations route for specific tenant
  const reservationsRoute = computed(() =>
    state.value.user?.tenant === 96 ? [{
      label: 'الحجوزات',
      icon: 'user-account',
      value: '2',
      children: [
        {
          to: '/doctors',
          key: 'doctors',
          label: 'الأطباء',
          permission: 'show_profiles'
        },
        {
          to: '/reservations',
          key: 'reservations',
          label: 'الحجوزات',
          permission: 'show_moderators_reports'
        }
      ]
    }] : []
  );
  const ticketsRoute = computed(() =>
    state.value.user?.tenant === 105 ? [
      {
        to: '/tickets',
        key: 'tickets',
        label: 'تذاكر العملاء',
        permission: 'update_settings',
        badge: state.value.user?.replied_tickets_count,
      },
      {
        to: '/ticket-types',
        key: 'ticket-types',
        label: 'انواع التذاكر',
        permission: 'update_settings'
      },
    ] : []
  );

  const customerServicesRoute = computed(() =>
    state.value.user?.tenant !== 105 ? [
      {
        to: '/customer-services',
        key: 'customer-services',
        label: 'خدمة العملاء',
        permission: 'update_settings',
        badge: state.value.user?.replied_tickets_count,
      },
    ] : []
  );
  // Raw menu items before permission filtering
  const rawItems: NavigationMenuItem[] = [
    {
      label: 'النظام والموقع',
      icon: 'saturn',
      value: '0',
      children: [{
        to: '/',
        label: 'لوحة التحكم',
        permission: 'show_statuses_reports',

      }]
    },
    {
      label: 'العمليات والعملاء',
      icon: 'user-group',
      value: '1',
      children: [
        {
          to: '/orders',
          key: 'orders',
          label: 'الطلبات',
          permission: 'show_orders'
        },
        {
          to: '/manage-clients',
          label: 'إدارة العملاء',
          key: 'manage-clients',
          permission: 'show_customers'
        },
        ...(state.value.user?.tenant === 105 
          ? [{
              to: '/customer-subscriptions',
              label: 'إشتراكات العملاء',
              key: 'customer-subscriptions',
              permission: 'show_customers'
            }]
          : []
        ),
      ]
    },
    ...reservationsRoute.value,
    {
      label: 'الموظفين والأداء',
      icon: 'quiz',
      value: '3',
      children: [
        {
          to: '/employees',
          key: 'employees',
          label: 'إدارة الموظفين',
          permission: 'show_profiles'
        },
        {
          to: '/follow-performance',
          key: 'follow-performance',
          label: 'متابعة الأداء',
          permission: 'show_moderators_reports'
        },
        {
          to: '/roles',
          key: 'roles',
          label: 'الأدوار والصلاحيات',
          permission: 'show_roles'
        }
      ]
    },
    {
      label: 'التسويق والتواصل',
      icon: 'marketing',
      value: '4',
      children: [
        {
          to: '/sources',
          label: 'المصادر',
          key: 'sources',
          img: 'hashtag',
          permission: 'show_sources'
        },
        {
          to: '/whatsapp',
          label: 'واتس آب',
          key: 'whatsapp',
          img: 'whatsapp',
          // permission: 'show_whatsapp'
          permission: 'show_sources'
        },
        {
          to: '/follow-sources',
          key: 'follow-sources',
          label: 'متابعة المصادر',
          permission: 'show_sources_reports'
        },
        {
          to: '/source-budgets',
          key: 'source-budgets',
          label: 'ميزانية المصادر',
          permission: 'show_source_budgets'
        },

        {
          to: '/whatsapp-campaigns',
          key: 'whatsapp-campaigns',
          label: 'حملات رسائل واتس آب',
          permission: 'show_campaigns'
        },

        {
          to: '/seo-pages',
          label: 'تحسين محركات البحث',
          key: 'seo-pages',
          permission: 'show_seopages'
        },
        {
          to: '/marketing-tools',
          label: 'أدوات التسويق',
          key: 'marketing-tools',
          permission: 'show_marketing_tools'
        }
      ]
    },
    {
      label: 'إعدادات الموقع',
      icon: 'web-design',
      value: '5',
      children: [
        {
          to: '/categories',
          key: 'categories',
          label: 'اقسام فورم طلب الخدمة',
          permission: 'show_categories'
        },
        {
          to: '/site-modules',
          key: 'site-modules',
          label: 'موديلات الموقع',
          permission: 'show_categories'
        },
        {
          to: '/site-sections',
          key: 'site-sections',
          label: 'الاقسام',
          permission: 'show_categories'
        },
        {
          to: '/static-pages',
          key: 'static-pages',
          label: 'الصفحات',
          permission: 'show_custom_pages'
        },
        {
          to: '/sliders',
          key: 'sliders',
          label: 'سلايدر الصفحة الرئيسية',
          permission: 'show_sliders'
        },
        {
          to: '/footer-data',
          key: 'footer-data',
          label: 'بيانات الفوتر',
          permission: 'show_contact_info'
        },
        {
          to: '/site-settings',
          key: 'site-settings',
          label: 'اعدادات موقعك',
          permission: 'update_settings'
        }
      ]
    },
    {
      label: 'الأعدادات والحسابات',
      icon: 'settings',
      value: '6',
      children: [
        {
          to: '/whatsapp-message',
          key: 'whatsapp-message',
          label: 'رسائل واتس آب',
          permission: 'show_whatsapp_messages'
        },
        
        {
          to: '/settings',
          label: 'الاعدادات',
          key: 'settings',
          permission: 'update_settings'
        },
        {
          to: '/contact-info',
          label: 'بيانات التواصل',
          key: 'contact-info',
          permission: 'show_contact_info'
        }
      ]
    },
    {
      label: 'التواصل والدعم',
      icon: 'headset',
      value: '7',
      children: [
        ...customerServicesRoute.value,
       
        ...ticketsRoute.value,
       
      ]
    }
  ]


  // Computed items with permission filtering and active states
  // const items = computed<NavigationMenuItem[]>(() => {
  //   return rawItems
  //     .map(item => {
  //       if (!item.children) return item;

  //       // Filter children by permission and add active state
  //       const visibleChildren = item.children
  //         .filter(child => !child.permission || hasPermission(child.permission))
  //         .map(child => ({
  //           ...child,
  //           active: child.to ? isPathActive(child.to) : false
  //         }));

  //       // Skip parent if no visible children
  //       if (visibleChildren.length === 0) return null;

  //       // Check if any child is active (route-based)
  //       const hasActiveChild = visibleChildren.some(child => child.active);
  //       return {
  //         ...item,
  //         children: visibleChildren,
  //         active: hasActiveChild,
  //         class: 'cursor-pointer'
  //       };
  //     })
  //     .filter(Boolean) as NavigationMenuItem[];
  // });

  // Computed active item - cached and reactive
  // const activeItem = computed(() => items.value.find(item => item.active));
  // const active = ref(activeItem.value?.value);

  // Auto-open active parent on route change
  // watch(() => route.path, () => {
  //   nextTick(() => {
  //     const item = activeItem.value;
  //     if (!item?.label) return;

  //     const button = document.querySelector(`button[data-value="${item.value}"]`) as HTMLElement ||
  //       document.querySelector(`button:has(img[src*="${item.icon}"])`) as HTMLElement;

  //     const parent = button?.closest('[data-state]') || button;
  //     parent?.getAttribute('data-state') !== 'open' && button?.click();
  //   });
  // }, { immediate: true });

  return {
    toggleCollapsed,
    side,
    // active,
    // items
  }
}