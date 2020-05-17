class UserInfo {
  constructor(user_info_box) {
    this.user_info_box = user_info_box;

    this.user_name_box = document.getElementById("user");

    this.username = null;

    this.logged_in = false;

    this.open_order_count = 0;

    this.renderInfoBox();
  }

  renderInfoBox() {
    this.user_info_box.innerHTML = "";

    if(this.logged_in) {
      let open_order_counter = document.createElement("div");
      open_order_counter.className = "open_order_count";
      open_order_counter.innerHTML = this.open_order_count;

      this.user_info_box.appendChild(open_order_counter);
    } else {
      let not_logged_in = document.createElement("div");
      not_logged_in.innerHTML = "Log in for information";

      this.user_info_box.appendChild(not_logged_in);
    }

    this.user_name_box.innerHTML = this.username ? this.username : "Not logged in";
  }
}
