/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'apps',
        title: 'Broadcast',
        type: 'collapsable',
        icon: 'heroicons_outline:cloud-upload',
        children: [
            {
                id: 'apps.Broadcast.uploadFile',
                title: 'Carga masiva',
                type: 'basic',
                link: '/uploadFile',
                exactMatch: true
            },
            {
                id: 'apps.Broadcast.listProcess',
                title: 'Ejecución de procesos',
                type: 'basic',
                link: '/uploadFile/processList',
                exactMatch: true
            }
        ],
    },{
        id: 'mantenimiento',
        title: 'Mantenimiendo',
        type: 'collapsable',
        icon: 'heroicons_outline:cog',
        children: [
            {
                id: 'mantenimiento.Categorias',
                title: 'Categorias',
                type: 'basic',
                link: '/categories/category/',
                exactMatch: true
            },
            {
                id: 'mantenimiento.Tipo_estado',
                title: 'Tipo de Estado',
                type: 'basic',
                link: '/categories/state_type/',
                exactMatch: true
            },
            {
                id: 'mantenimiento.Unidad_negocio/',
                title: 'Unidad de Negocio',
                type: 'basic',
                link: '/categories/business_unit/',
                exactMatch: true
            }
        ],
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps',
        title   : 'Broadcast',
        type    : 'aside',
        icon    : 'heroicons_outline:cloud-upload',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },{
        id      : 'mantenimiento',
        title   : 'Mantenimiendo',
        type    : 'aside',
        icon    : 'heroicons_outline:z',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps',
        title   : 'Broadcast',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },{
        id      : 'mantenimiento',
        title   : 'Mantenimiendo',
        type    : 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id      : 'apps',
        title   : 'Broadcast',
        type    : 'group',
        icon    : 'heroicons_outline:cloud-upload',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'mantenimiento',
        title   : 'Mantenimiento',
        type    : 'group',
        icon    : 'heroicons_outline:cog',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
