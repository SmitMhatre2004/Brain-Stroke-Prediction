import React from "react";
import "./Programs.css";
import Brain_Stroke from "../../assets/Brain_Stroke.png";
import Hemorrhagic from "../../assets/Hemorrhagic.jpg";
import Ischemic_Stroke from "../../assets/Ischemic_Stroke.jpg";
const Programs = () => {
  return (
    <div className="information"  >
      <h1 className="main_title">Information</h1>
      <div className="cards">
        <div className="programs ">
          <div className="program">
            <img src={Hemorrhagic} alt="" />
          </div>
          <div className="title">Brain Stroke</div>
          <div className="read">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              vero hic veritatis quibusdam optio. Sint dolorem magnam et rem
              placeat, tenetur alias! Eveniet quos recusandae ad natus
              dignissimos qui ducimus.
            </p>
            <button>READ MORE..</button>
          </div>
        </div>

        <div className="programs">
          <div className="program">
            <img src={Ischemic_Stroke} alt="" />
          </div>
          <div className="title">Brain Stroke</div>
          <div className="read">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              vero hic veritatis quibusdam optio. Sint dolorem magnam et rem
              placeat, tenetur alias! Eveniet quos recusandae ad natus
              dignissimos qui ducimus.
            </p>
            <button>READ MORE..</button>
          </div>
        </div>

        <div className="programs">
          <div className="program">
            <img src={Ischemic_Stroke} alt="" />
          </div>
          <div className="title">Brain Stroke</div>
          <div className="read">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              vero hic veritatis quibusdam optio. Sint dolorem magnam et rem
              placeat, tenetur alias! Eveniet quos recusandae ad natus
              dignissimos qui ducimus.
            </p>
            <button>READ MORE..</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
