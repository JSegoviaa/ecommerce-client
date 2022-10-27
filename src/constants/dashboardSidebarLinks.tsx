import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CommentIcon from '@mui/icons-material/Comment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import StyleIcon from '@mui/icons-material/Style';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GrainIcon from '@mui/icons-material/Grain';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ColorLensIcon from '@mui/icons-material/ColorLens';

export const links = [
  {
    check: 'Inicio',
    icon: <HomeOutlinedIcon />,
    name: 'Inicio',
    route: '/admin',
    validRoles: [1, 2, 3],
  },
  {
    check: 'Categorías',
    icon: <StorefrontIcon />,
    name: 'Categorías',
    route: '/admin/categorias',
    validRoles: [1, 2, 3],
  },
  {
    check: 'Códigos',
    icon: <WysiwygIcon />,
    name: 'Códigos',
    route: '/admin/codigos',
    validRoles: [1],
  },
  {
    check: 'Comentarios',
    icon: <CommentIcon />,
    name: 'Comentarios',
    route: '/admin/comentarios',
    validRoles: [1, 2],
  },
  {
    check: 'Direcciones',
    icon: <MapsHomeWorkIcon />,
    name: 'Direcciones',
    route: '/admin/direcciones',
    validRoles: [1, 2],
  },
  {
    check: 'Etiquetas',
    icon: <StyleIcon />,
    name: 'Etiquetas',
    route: '/admin/etiquetas',
    validRoles: [1, 2, 3],
  },
  {
    check: 'Productos',
    icon: <SellIcon />,
    name: 'Productos',
    route: '/admin/productos',
    validRoles: [1, 2, 3],
  },
  {
    check: 'Ratings',
    icon: <FavoriteIcon />,
    name: 'Ratings',
    route: '/admin/ratings',
    validRoles: [1, 2],
  },
  {
    check: 'Subcategorías',
    icon: <StorefrontIcon />,
    name: 'Subcategorías',
    route: '/admin/subcategorias',
    validRoles: [1, 2, 3],
  },
  {
    check: 'Usuarios',
    icon: <PeopleAltIcon />,
    name: 'Usuarios',
    route: '/admin/usuarios',
    validRoles: [1, 2],
  },
  {
    check: 'Variantes',
    icon: <GrainIcon />,
    name: 'Variantes',
    route: '/admin/variantes',
    validRoles: [1],
  },
];

export const collapsedLinks = [
  {
    check: 'Tamaños',
    icon: <FormatSizeIcon />,
    name: 'Tamaños',
    route: '/admin/variantes/tamanos',
    validRoles: [1],
  },
  {
    check: 'Colores',
    icon: <ColorLensIcon />,
    name: 'Colores',
    route: '/admin/variantes/colores',
    validRoles: [1],
  },
];
