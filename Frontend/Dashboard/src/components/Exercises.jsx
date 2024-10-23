import { useEffect, useState, useContext, useRef } from 'react';
import { LoginContext } from "../utils/Contexts";
import { FetchImage } from '../apis/UserViewApis';
import styles from '../styles/Exercises.module.css';

const Exercises = () => {
    // Context
    const { accessToken } = useContext(LoginContext);

    const initialized = useRef(false);

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            setIsLoading(true);

            FetchUsers(accessToken, currentPage).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data.pagination_data);
                    setUserData([]);
                    response.data.users.map((user) => {
                        if (!userData.some(item => user.user_id === item.user_id)) {
                            setUserData(response.data.users);
                        }
                    });
                } else {
                    console.log(response);
                }
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, [currentPage]);

    if (isLoading) {
        return <></>;
    }
    return (
        <></>
    )
};
export default Exercises;