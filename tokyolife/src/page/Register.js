import React from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import "../component/Style/register.css"
import { Link } from "react-router-dom";
import AuthService from "../assets/data/AuthService";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = async (data) => {
        console.log(data);
        if (
            data.surName &&
            data.firstName &&
            data.gender &&
            data.dateOfBirth &&
            data.email &&
            data.phone &&
            data.password
        ) {
            AuthService.postRegisterInformation({
                username: data.email,
                password: data.password,
                customer: {
                    email: data.email,
                    dateOfBirth: data.dateOfBirth,
                    fullName: data.surName + ' ' + data.firstName,
                    sex: data.gender,
                    phone: data.phone
                },
                role: {
                    id: "2"
                }
            }).then(() => {
                window.location.href = '/';
            }).catch((error) => {
                console.error(error);
            })
        }
    };


    return (
        <>
            <Container className="register-page" style={{ maxWidth: "620px", paddingTop: "30px" }}>
                <div>

                    <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="title-register text-center">Tạo tài khoản</h3>
                        <div className="surName">
                            <label htmlFor="surName" style={{ marginRight: "5px" }}>Họ</label>
                            <input type="text" name="surName"  {...register('surName', { required: true })} />
                            {errors.surName && <span>This field is required</span>}
                        </div>
                        <div className="firstName">
                            <label htmlFor="firstName" style={{ marginRight: "5px" }}>Tên</label>
                            <input type="text" name="firstName"  {...register('firstName', { required: true })} />
                            {errors.firstName && <span>This field is required</span>}
                        </div>
                        <div className="gender">
                            <div style={{ marginRight: "30px" }}>
                                <input style={{ marginRight: "5px" }} type="radio" name="gender" value="MALE" {...register('gender')} />
                                <label htmlFor="male">Nam</label>
                            </div>
                            <div>
                                <input style={{ marginRight: "5px" }} type="radio" name="gender" value="FEMALE" {...register('gender')} />
                                <label htmlFor="female">Nữ</label>
                            </div>
                        </div>
                        <div className="dateOfBirth">
                            <input type="date" name="dateOfBirth" {...register('dateOfBirth')} />
                        </div>
                        <div className="email">
                            <label style={{ marginRight: "5px" }} htmlFor="email">Email</label>
                            <input type="email" name="email" {...register('email', { required: true })} />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="phone">
                            <label style={{ marginRight: "5px" }} htmlFor="phone">Phone</label>
                            <input type="number" name="phone" {...register('phone', { required: true })} />
                            {errors.phone && <span>This field is required</span>}
                        </div>
                        <div className="password">
                            <label style={{ marginRight: "5px" }} htmlFor="password">Password</label>
                            <input type="password" name="password" {...register('password', { required: true })} />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div class="sitebox-recaptcha" style={{ fontSize: "13px" }}>
                            This site is protected by reCAPTCHA and the Google

                            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Privacy Policy </a>

                            and
                            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Terms of Service </a> apply.
                        </div>
                        <button className="btn-register" type="submit">Đăng ký</button>
                        <Link to={"/"}><p>Quay lại trang chủ</p></Link>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Register