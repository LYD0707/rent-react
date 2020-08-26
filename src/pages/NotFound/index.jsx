import React from 'react';
import { Link } from 'react-router-dom'

/**
 * 404页面
 */
export default function NotFound () {
    return (
        <center className="not-found">
            <Link to="/home">回首页</Link>
        </center>
    )
}