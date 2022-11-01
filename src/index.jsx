import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './routes/Dashboard';
import Instruments from './routes/Instruments';
import Dividends from './routes/Dividends';
import Instrument from './routes/Instrument';
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Upload from './routes/Upload';
import UploadTag from './routes/UploadTag';
import DashboardYear from './routes/DashboardYear';
import Login from './routes/Login';
import LoggedIn from './LoggedIn';
import NotFound from './routes/NotFound';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<LoggedIn />} >

            <Route index element={<Dashboard />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:year" element={<DashboardYear />} />
            <Route path="instruments">
              <Route index element={<Instruments />} />
              <Route path=":isin" element={<Instrument />} />
            </Route>
            <Route path="dividends" element={<Dividends />} />
            <Route path="upload">
              <Route index element={<Upload />} />
              <Route path=":tag" element={<UploadTag />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


