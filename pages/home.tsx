import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { WithAuth } from '../components/withAuth'
import Layout from '../components/layout'
import { useForceUpdate } from '../helpers/useForceUpdate'

const Home = () => {
    const pushes = useRef<any[]>([]);
    const forceUpdate = useForceUpdate();
    const [channel, setChannel] = useState<any>(null);

    const updatePushes = (data: any) => {
        pushes.current = [...pushes.current, data];
        forceUpdate();
    }

    const connectToChannel = () => {
        if (!channel) {
            const token = localStorage.getItem('token');
            // @ts-ignore
            const pusher = new Pusher('02ee63cfae255bfaf7b8', {
                cluster: 'eu',
                authEndpoint: `http://localhost:4000/pusher/auth?token=${token}`
            });
            const ch = pusher.subscribe('presence-my-channel');
            setChannel(ch);
            ch.bind('client-msg', updatePushes);
        }
    }

    useEffect(() => {
        console.log('update')
    }, [pushes.current])

    useEffect(() => {
        // @ts-ignore
        Pusher.logToConsole = true;
        connectToChannel();
    }, [])

    const clickHandler = () => {
        if (channel) {
            channel.trigger("client-msg", {
                message: "hello world client",
            });
        }
    }

    return (
        <>
            <div className='flex flex-col'>
                {pushes.current.map((push, idx) => (
                    <div key={idx}>{push.message}</div>
                ))}
            </div>
            <button type="button" onClick={clickHandler}>Send</button>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <WithAuth>
            <Layout>
                {page}
            </Layout>
        </WithAuth>
    )
}
export default Home;
