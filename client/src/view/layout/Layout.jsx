import Menu from "./Menu";
import PageLayout from "./PageLayout";

function Layout(props) {
  return (
    <div className="ui container">
      <Menu></Menu>
      <PageLayout>
        {props.children}
      </PageLayout>
    </div>
  );
}

export default Layout;
