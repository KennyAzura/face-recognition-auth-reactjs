import "../../css/Dashboard.css";
import { Menu } from "./Menu";
import { BsFillCameraFill } from "react-icons/bs";

export const Dashboard = () => {
  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-lg-3 my-box left-side">
          <Menu />
        </div>
        <div className="col-lg-9 right-side">
          <div className="row">
            <div className="dashboard-container">
              <div className="dash-item">
                <div className="dash-img green">
                  <img
                    src="/images/income.png"
                    alt="icon in"
                    className="dash_item-img"
                  />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">item</h2>
                  <p className="dash-content-p">Tổng thu nhập</p>
                </div>
              </div>
              <div className="dash-item">
                <div className="dash-img yellow">
                  <img
                    src="/images/tourists.png"
                    alt="icon in"
                    className="dash_item-img"
                  />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">item</h2>
                  <p className="dash-content-p">Tổng số lượng nhân viên</p>
                </div>
              </div>
              <div className="dash-item">
                <div className="dash-img yellow">
                  <img
                    src="/images/tourists.png"
                    alt="icon in"
                    className="dash_item-img"
                  />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">item</h2>
                  <p className="dash-content-p">Tổng số lượng khu du lịch</p>
                </div>
              </div>
              <div className="dash-item">
                <div className="dash-img yellow">
                  <BsFillCameraFill className="dash_item-img" />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">item</h2>
                  <p className="dash-content-p">Tổng số lượng camera</p>
                </div>
              </div>
              {/* <div className="dash-item area">
                <div>
                  <div className="dash-img orange">
                    <img
                      src="/images/tourists.png"
                      alt="icon in"
                      className="dash_item-img"
                    />
                  </div>
                  <div className="dash-go">
                    <div className="dash-go_item">
                      <div>
                        <img
                          src="/images/in.png"
                          alt="icon in"
                          className="count_percent-icon"
                        />
                        <span>Vào</span>
                      </div>
                    </div>
                    <div className="dash-go_item">
                      <div>
                        <img
                          src="/images/out.png"
                          alt="icon out"
                          className="count_percent-icon"
                        />
                        <span>Ra</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">item</h2>
                  <p className="dash-content-p">Tổng số lượng khu du lịch</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
