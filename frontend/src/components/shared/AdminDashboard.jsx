import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { convertToReadableFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalUser, setTotalUser] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [lastMonthUser, setLastMonthUser] = useState(0);
  const [lastMonthPost, setLastMonthPost] = useState(0);
  const [lastMonthComment, setLastMonthComment] = useState(0);

  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUser(data.totalUsers);
          setLastMonthUser(data.lastMonthUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getpost?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPost(data.totalPosts);
          setLastMonthPost(data.lastMonthPost);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComment(data.totalComment);
          setLastMonthComment(data.lastMonthComment);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
      fetchPost();
      fetchUsers();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <DashboardCard
          title="All Users"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalUser, fill: "blue" }]}
          chartConfig={{
            users: { label: "Users" },
          }}
          totalValue={totalUser}
          lastMonthValue={lastMonthUser}
          footerText={"Showing total users for all time"}
          endAngle={250}
        />
        <DashboardCard
          title="All Comments"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalUser, fill: "orange" }]}
          chartConfig={{
            users: { label: "Users" },
          }}
          totalValue={totalComment}
          lastMonthValue={lastMonthComment}
          footerText={"Showing total comments for all time"}
          endAngle={160}
        />

        <DashboardCard
          title="All Posts"
          description={`${convertToReadableFormat(
            currentUser.createdAt
          )} - ${convertToReadableFormat(Date.now())}`}
          chartData={[{ value: totalUser, fill: "green" }]}
          chartConfig={{
            users: { label: "Users" },
          }}
          totalValue={totalPost}
          lastMonthValue={lastMonthPost}
          footerText={"Showing total posts for all time"}
          endAngle={110}
        />
      </div>

      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-xl font-bold text-slate-700">
              Recent Users
            </h1>

            <Button>
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>

          <Table>
            <TableCaption>A list of your recent users.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>User image</TableHead>
                <TableHead>Username</TableHead>
              </TableRow>
            </TableHeader>

            {users.map((user) => (
              <TableBody className="divide-y" key={user._id}>
                <TableRow>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-200 rounded-full"
                    />
                  </TableCell>

                  <TableCell className="w-32">{user.username}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-xl font-bold text-slate-700">
              Recent Comments
            </h1>

            <Button>
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>

          <Table>
            <TableCaption>A list of your recent comments.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Comments</TableHead>
                <TableHead>Likes</TableHead>
              </TableRow>
            </TableHeader>

            {comments &&
              comments.map((comment) => (
                <TableBody className="divide-y" key={comment._id}>
                  <TableRow>
                    <TableCell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>

                    <TableCell>{comment.numberOfLikes}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2 text-xl font-bold text-slate-700">
              Recent Posts
            </h1>

            <Button>
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>

          <Table>
            <TableCaption>A list of your recent posts.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Post image</TableHead>
                <TableHead>Post Title</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>

            {posts &&
              posts.map((post) => (
                <TableBody className="divide-y" key={post._id}>
                  <TableRow>
                    <TableCell>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-10 h-10 object-cover bg-gray-200 rounded-full"
                      />
                    </TableCell>

                    <TableCell className="w-80">{post.title}</TableCell>

                    <TableCell className="w-5">{post.category}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
