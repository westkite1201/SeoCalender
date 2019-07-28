// @material-ui/icons
import CalenderTable from '../components/Calender/CalenderTable'
import CalenderTest from '../components/Calender/CalenderTest'

// <Route exact path = {`${match.url}/notice`} component ={Board}/>
// <Switch>
//     <Route path = {`${match.url}/notice/writePosts`} component ={WriteBoard}/>
//     <Route exact path = {`${match.url}/notice/:postsNumber`} component ={BoardView}/>
// </Switch>
// <Route path = {`${match.url}/notice/editPosts/:editNumber`} component ={EditBoard}/>


const dashboardRoutes = [
  {
    sideView: true, 
    //exact : true,
    path: "/CalenderTest",
    sidebarName: "CalenderTest",
    navbarName: "CalenderTest login",
    icon: CalenderTest,
    component: CalenderTest
  },

  {
    sideView: true, 
    path: "/CalenderTable",
    sidebarName: "CalenderTable",
    navbarName: "CalenderTable",
    icon: CalenderTable,
    component: CalenderTable
  },

  // {
  //   sideView: true, 
  //   path: "/TimerView",
  //   sidebarName: "TimerView",
  //   navbarName: "Material Dashboard",
  //   icon: TimerView,
  //   component: TimerView
  // },


  //{ redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
