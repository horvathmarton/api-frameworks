defmodule HelloWeb.PageController do
  use HelloWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

defmodule HelloWeb.HelloController do
  use HelloWeb, :controller

  def index(conn, %{"message" => message}) do
    render(conn, "show.html", message: message)
  end
end
