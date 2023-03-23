import {
  Icon,
  SwipeCell,
  Button,
  Form,
  Field,
  CellGroup,
  Toast,
  Search,
  Swipe,
  SwipeItem,
  Sidebar,
  SidebarItem,
  ActionBar,
  ActionBarButton,
  ActionBarIcon
} from "vant"

export default function(app){
  const component=[Icon,SwipeCell,Button,Form,Field,CellGroup,Toast,Search,Swipe,SwipeItem,Sidebar,SidebarItem,ActionBar,ActionBarButton,ActionBarIcon]

  for(const cpt of component){
    app.use(cpt)
  }
}
