import Header from "../components/Header/Header";
import BackHomeButton from "../components/BackHomeButton";
import { authStorage } from "../services/auth";

export default function MyAppointments(){const client=authStorage.getClient();return <><Header/><main className="container" style={{paddingBlock:"64px"}}><section className="admin-card"><BackHomeButton /><h1>Meus Agendamentos</h1>{client?<p className="muted">Olá, {client.name||client.email}. Em breve seus agendamentos serão listados aqui conforme retorno do backend.</p>:<p className="muted">Entre como cliente para acompanhar seus horários.</p>}<a className="primary-btn" style={{display:"inline-block",marginTop:20}} href={client?"/agendar":"/login"}>{client?"Novo agendamento":"Fazer login"}</a></section></main></>}
