export interface VentasInstaleTienda {
  fecha_atencion: Date;
  jornada_atencion: string;
  pedido: string;
  regional: string;
  documento_cliente: string;
  contacto_cliente: string;
  observacion_canal: string;
  login_despacho: string;
  nombre_tecnico: string;
  documento_tecnico: string;
  categoria: string;
}

export interface RespuestaPedidoVenta {
  pedido: number;
  observacion_gestion: string;
  tipificacion: string;
  obs_tipificacion: string;
  fecha_gestion: Date;
  fecha_ingreso: Date;
}

export interface GuardaUsuario {
  nombre: string;
  cedula: string;
  login: string;
  password: string;
  con_pass: string;
  ciudad: string;
  canal: string;
  perfil: string;
}

export interface usuarios {
  Nombre: string;
  Cedula: string;
  Login: string;
  Perfil: string;
  estado: string;
}

export interface ListMenu {
  id: number;
  menu: string;
  estado: string;
}
export interface ListPerfil{
  id: number;
  perfil: string;
  estado: string;
}
