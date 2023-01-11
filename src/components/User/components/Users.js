import React, { useState, useEffect } from 'react';
import { hostUrl } from '../../../common/urls';

export default function Users() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = () => {
        setLoading(true);
        fetch(`${hostUrl}/users`)
            .then((resp) => resp.json())
            .then((list) => {
                setUserList(list);
                setLoading(false);
            });
    };

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div className="list">
            {loading
                ? 'downloading...'
                : userList.map((user) => (
                      <div className="listItem" key={user._id}>
                          <div>{user.first_name}</div>
                          <div className="listItem__buttons">
                              <button>Edit</button>
                              <button>Delete</button>
                          </div>
                      </div>
                  ))}
        </div>
    );
}
