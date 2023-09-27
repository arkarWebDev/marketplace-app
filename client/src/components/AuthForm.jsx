import { Form, Input } from "antd";

const AuthForm = ({ isLoginPage }) => {
  const handleOnFinish = async (values) => {
    console.log(values);
  };
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className=" w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.IO - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name must be include.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="name ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email must be include.",
              },
              {
                type: "email",
                message: "Enter a valid E-mail !",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password must be include.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button className="w-full outline-none bg-blue-600 text-white py-2 rounded-md">
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
