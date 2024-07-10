import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import Admin from "./Admin/Components/Admin";
import Layout from "./Admin/Components/Layout";
import Categories from "./Admin/Categories/Categories";
import CategoriesFormContextProvider from "./Admin/Categories/context/CategoriesFormContext";
import Form from "./Admin/Categories/Form/Form";
import Author from "./Admin/Author/Author";
import AuthorForm from "./Admin/Author/Form/AuthorForm";
import AuthorFormContextProvider from "./Admin/Author/context/AuthorFormContext";
import Posts from "./Admin/Posts/Posts";
import PostsForm from "./Admin/Posts/Form/PostsForm";
import PostsFormContextProvider from "./Admin/Posts/context/PostFormContext";
import Home from "./Pages/Home";
import AllPostListView from "./component/AllPostListView/AllPostListView";
import PostDetail from "./Pages/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route
          path="/admin"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/admin/categories/form"
          element={
            <Layout>
              <CategoriesFormContextProvider>
                <Form />
              </CategoriesFormContextProvider>
            </Layout>
          }
        />
        <Route
          path="/admin/authors"
          element={
            <Layout>
              <Author />
            </Layout>
          }
        />
        <Route
          path="/admin/authors/authorform"
          element={
            <Layout>
              <AuthorFormContextProvider>
                <AuthorForm />
              </AuthorFormContextProvider>
            </Layout>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <Layout>
              <Posts />
            </Layout>
          }
        />
        <Route
          path="/admin/posts/postsform"
          element={
            <Layout>
              <PostsFormContextProvider>
                <PostsForm />
              </PostsFormContextProvider>
            </Layout>
          }
        />
        <Route exact path="/" element={<AllPostListView/>}/>
        <Route path="/posts/:postId" element={<PostDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
