import React from "react";
import { useForm } from "react-hook-form";


const SignUp = () => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <>
            <h3 className="title-register">Tạo tài khoản</h3>
            <form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="surName">Họ</label>
                        <input type="text" name="surName" ref={register({ required: true })} />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div>
                        <label htmlFor="firstName">Tên</label>
                        <input type="text" name="firstName" ref={register({ required: true })} />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div>
                        <label htmlFor="gender">Giới tính</label>
                        <div>
                            <input type="checkbox" name="gender" value="male" ref={register} />
                            <label htmlFor="male">Nam</label>
                        </div>
                        <div>
                            <input type="checkbox" name="gender" value="female" ref={register} />
                            <label htmlFor="female">Nữ</label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="dob">Ngày sinh</label>
                        <input type="date" name="dob" ref={register} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" ref={register({ required: true })} />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" ref={register({ required: true })} />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <button type="submit">Register</button>
                </form>
            </form>
        </>
    )
}

export default SignUp