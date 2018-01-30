import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlogTile from './subcomponents/BlogTile';

// import axios
import axios from 'axios';

class User extends Component{
    constructor(){
        super();

        this.state={
            user: {},
            posts: []
        }

        this.getUser1 = this.getUser1.bind(this);
        this.getPosts1 = this.getPosts1.bind(this);

    }

    // insert componentWillMount
    
        componentDidMount(){

            axios.all([this.getUser1(), this.getPosts1()])
            .then(axios.spread((response1, response2) => {
                // console.log(">>>>>>>>>>>>>>>><", response2.data)
                // let user = response2.data
                this.setState({
                    user: response1.data,
                    posts: response2.data
                })
            })).catch(console.log);
        }

         getUser1(){
          return axios.get(`/api/user/${this.props.match.params.id}`)
        }
         getPosts1(){
          return axios.get(`/api/blogs?userID=${this.props.match.params.id}`)
        }




    render(){
        const user = this.state.user
        const posts = this.state.posts.map((c,i)=><BlogTile key={i} blog={c}/>)
        return (
            <div className='content'>
                <div className="profile">
                        {user.img ? <img src={user.img} alt="profile pic"/> :<img src={'https://unsplash.it/300/?random'} alt="profile pic"/>}
                        <span>
                            <h1>{user.name}</h1>
                            <p>{user.desc}</p>
                            <Link to={`/user/${user.id}/edit`}>
                                <button className="edit-user">Edit User</button>
                            </Link>
                        </span>
                </div>
                <div className="post-list">
                    <h2>Posts by User:</h2>
                    {posts.length? posts : <p>No Blog Posts from this User</p>}
                </div>
            </div>
        )
    }
}

export default User