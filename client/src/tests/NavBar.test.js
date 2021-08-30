import React from "react";
import { NavLink } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavBar from "../components/Navbar/Navbar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavBar />);
    });
    it("Deberia renderizar Cuatro <NavLink />", () => {
        expect(wrapper.find(NavLink)).toHaveLength(4);
      });
      it("El segundo NavLink debe tener el texto 'Inicio' y cambiar hacia la ruta '/home' ", () => {
          expect(wrapper.find(NavLink).at(1).prop('to')).toEqual('/home');
          expect(wrapper.find(NavLink).at(1).text()).toEqual("Inicio");
      });
})